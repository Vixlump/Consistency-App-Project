import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Switch,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BACKGROUND_IMAGES } from '../data/backgrounds';
import * as ImagePicker from 'expo-image-picker';

export default function CreateHabitScreen({ navigation, route }) {
    // Check for "edit mode"
    const habitToEdit = route.params?.habitToEdit;
    const isEditMode = !!habitToEdit;

    // Pre-fill state if editing
    const [habitName, setHabitName] = useState(habitToEdit?.title || '');
    const [description, setDescription] = useState(habitToEdit?.subtitle || '');
    const [selectedImageSource, setSelectedImageSource] = useState(habitToEdit?.imageSource || BACKGROUND_IMAGES[0].image);

    const [customImage, setCustomImage] = useState(null);
    const [remindMe, setRemindMe] = useState(false);
    const [pageWidth, setPageWidth] = useState(0);
    const [pagination, setPagination] = useState({ page: 0, totalPages: 1 });
    const viewWidthRef = useRef(0);

    const onImport = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const newImageSource = { uri: result.assets[0].uri };
            setCustomImage(newImageSource);
            setSelectedImageSource(newImageSource);
        }
    };

    const onSave = () => {
        if (isEditMode) {
            const updatedHabit = {
                ...habitToEdit,
                title: habitName,
                subtitle: description,
                imageSource: selectedImageSource,
            };
            // Send the updated habit back to HomeScreen
            navigation.navigate('Home', { updatedHabit: updatedHabit });

        } else {
            const newHabit = {
                id: String(Date.now()),
                title: habitName,
                subtitle: description,
                streak: '0 days',
                status: 'In Progress',
                imageSource: selectedImageSource,
            };
            // Send the new habit back to HomeScreen
            navigation.navigate('Home', { newHabit: newHabit });
        }
    };

    const allImages = useMemo(() => {
        const images = [...BACKGROUND_IMAGES];
        if (customImage) {
            // Add custom image to the front of the list
            images.unshift({ id: 'custom', image: customImage });
        }
        return images;
    }, [customImage]);

    const imagePages = useMemo(() => {
        const chunks = [];
        const CHUNK_SIZE = 6; // 6 images per page (2x3 grid)
        for (let i = 0; i < allImages.length; i += CHUNK_SIZE) {
            chunks.push(allImages.slice(i, i + CHUNK_SIZE));
        }
        return chunks;
    }, [allImages]);

    const updatePagination = (scrollX = 0) => {
        const viewWidth = viewWidthRef.current;
        if (viewWidth === 0) return;

        // Total pages is the number of chunks
        const totalPages = imagePages.length;
        // Current page is the scroll offset divided by the page width
        const currentPage = Math.round(scrollX / viewWidth);

        if (pagination.page !== currentPage || pagination.totalPages !== totalPages) {
            setPagination({ page: currentPage, totalPages });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        {isEditMode ? 'Edit Habit' : 'Create Habit'}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                        <Ionicons name="close" size={28} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView}>
                    <Text style={styles.label}>HABIT NAME</Text>
                    <TextInput
                        style={styles.input}
                        value={habitName}
                        onChangeText={setHabitName}
                        placeholder="e.g. 🥊 Boxing"
                        placeholderTextColor="#555"
                    />

                    <Text style={styles.label}>DESCRIPTION</Text>
                    <TextInput
                        style={[styles.input, styles.descriptionInput]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="e.g. 8 glasses a day"
                        placeholderTextColor="#555"
                        multiline
                    />

                    <Text style={styles.label}>BACKGROUND</Text>

                    <View style={styles.imagePagerContainer}>


                        {pagination.page > 0 && (
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color="#ffffff"
                                style={styles.arrowIconLeft}
                                pointerEvents="none"
                            />
                        )}

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}

                            pagingEnabled
                            decelerationRate="fast"
                            onLayout={(e) => {
                                const width = e.nativeEvent.layout.width;
                                setPageWidth(width);
                                viewWidthRef.current = width;
                                updatePagination();
                            }}
                            onScroll={(e) => {
                                updatePagination(e.nativeEvent.contentOffset.x);
                            }}
                            scrollEventThrottle={32}
                        >

                            {pageWidth > 0 && imagePages.map((page, pageIndex) => (

                                <View
                                    key={pageIndex}
                                    style={[styles.page, { width: pageWidth }]}
                                >
                                    {page.map((bg) => {
                      
                                        const isSelected = (selectedImageSource.uri && selectedImageSource.uri === bg.image.uri) || (selectedImageSource === bg.image);
                                        return (
                                            <TouchableOpacity
                                                key={bg.id}
                                                onPress={() => setSelectedImageSource(bg.image)}
                                                style={[styles.imageContainer, isSelected && styles.imageSelected]}
                                            >
                                                <Image source={bg.image} style={styles.image} />
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            ))}
                        </ScrollView>

                        {/* Arrow Icon */}
                        {pagination.page < pagination.totalPages - 1 && (
                            <Ionicons
                                name="chevron-forward"
                                size={24}
                                color="#ffffff"
                                style={styles.arrowIcon}
                                pointerEvents="none"
                            />
                        )}
                    </View>

                    {/* Pagination Dots */}
                    {pagination.totalPages > 1 && (
                        <View style={styles.paginationContainer}>
                            {Array.from({ length: pagination.totalPages }).map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.paginationDot,
                                        index === pagination.page ? styles.paginationDotActive : null,
                                    ]}
                                />
                            ))}
                        </View>
                    )}

           
                    <View style={styles.importButtonWrapper}>
                        <TouchableOpacity style={styles.importButton} onPress={onImport}>
                            <Ionicons name="download-outline" size={20} color="#FFF" />
                            <Text style={styles.importButtonText}>Import</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>ADVANCE OPTIONS</Text>
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity style={styles.optionRow}>
                            <Text style={styles.optionText}>Repeat</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.optionValue}>Every day</Text>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </View>
                        </TouchableOpacity>

                        <View style={[styles.optionRow, styles.optionRowLast]}>
                            <Text style={styles.optionText}>Remind me</Text>
                            <Switch
                                trackColor={{ false: '#3e3e3e', true: '008000' }}
                                thumbColor={remindMe ? '#f4f3f4' : '#f4f3f4'}
                                onValueChange={() => setRemindMe(previousState => !previousState)}
                                value={remindMe}
                            />
                        </View>
                    </View>
                </ScrollView>

 
                <View style={styles.saveButtonContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        position: 'relative',
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    closeButton: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
    },
    label: {
        color: '#999',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#1C1C1E',
        color: '#FFF',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    imagePagerContainer: {
        position: 'relative',
        marginTop: 8,
        // This container has no padding, letting the ScrollView be full-width
    },

    page: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        // Add padding *inside* the page so items don't touch the edge
        paddingHorizontal: 5,
    },

    imageContainer: {
        width: '31%',     // Approx 1/3 width (31% * 3 + spacing)
        aspectRatio: 1,   // Makes it a perfect square
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'transparent',
        marginBottom: 10, // Space between the two rows
    },
    imageSelected: {
        borderColor: '#007AFF',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    arrowIcon: {
        position: 'absolute',
        right: -16, // Move it slightly outside the scroll area
        top: '50%',
        marginTop: -20, // Adjust vertical position for 2 rows
        zIndex: 10, // Add zIndex to make sure it's on top
    },

    arrowIconLeft: {
        position: 'absolute',
        left: -16,
        top: '50%',
        marginTop: -20, // Match the right arrow
        zIndex: 10, // Add zIndex to make sure it's on top
    },

    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12, // Space above the dots
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#555',
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: '#FFF',
    },
    // --- Import Button Styles ---
    importButtonWrapper: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    importButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        gap: 8,
    },
    importButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    // --- Advance Options Styles ---
    imageContainer: {
        width: '31%',     // Makes 3 columns (31% * 3 = 93% + space)
        aspectRatio: 1,   // Makes the height equal to the width (a square)
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'transparent',
        marginBottom: 12, // Space between the rows
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#3A3A3C',
    },
    optionRowLast: {
        borderBottomWidth: 0,
    },
    optionText: {
        color: '#FFF',
        fontSize: 16,
    },
    optionValue: {
        color: '#999',
        fontSize: 16,
    },
    // --- Save Button Styles ---
    saveButtonContainer: {
        padding: 16,
        backgroundColor: '#000',
    },
    saveButton: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 14,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
    },
});