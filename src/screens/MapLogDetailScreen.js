import React from 'react';
import {
    ImageBackground,
    View,
    Text,
    StyleSheet,
    Pressable,
    SafeAreaView,
    Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { deleteLog } from '../utils/logs';


export default function MapLogDetailScreen({ route, navigation }) {
    const { log } = route.params || {};

    // fallback data
    //   const title = 'Sauna';
    const title = log?.title || 'Untitle';
    // const note = log?.note || 'chillin in the heat.';
    // const address = log?.address || 'random location';
    const note = log?.note || 'Empty note';
    const address = log?.address || 'No location found';
    const timeStr = log?.timestamp
        ? new Date(log.timestamp).toLocaleString()
        : '';

    const bgSource = log?.photoUri
        ? { uri: log.photoUri }
        : require('../../assets/images/japan_bg.png');

    // replace your goEdit with:
    const goEdit = () => {
        navigation.navigate('MapLogEdit', {
            mode: 'edit',
            logId: log.id,
            photoUri: log.photoUri,                // keep the same background
            coords: { lat: log.lat, lng: log.lng },
            initialValues: {
                title: log.title ?? '',
                notes: log.note ?? '',
                locationText: log.address ?? ''
            }
        });
    };

    const onDelete = () => {
        Alert.alert(
            'Delete this log?',
            'This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const ok = await deleteLog(log.id);
                        if (ok) navigation.goBack(); // LogsMapScreen will refresh via useFocusEffect
                    },
                },
            ]
        );
    };

    return (
        <ImageBackground source={bgSource} style={styles.bg}>
            <SafeAreaView style={StyleSheet.absoluteFill}>
                {/* Close Button */}
                <Pressable style={styles.close} onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={36} color="#fff" />
                </Pressable>

                {/* Card */}
                <View style={styles.cardWrap} pointerEvents="box-none">
                    <BlurView intensity={30} tint="dark" style={styles.card}>
                        {!!timeStr && <Text style={styles.time}>{timeStr}</Text>}

                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.row}>💬 {note}</Text>
                        <Text style={styles.row}>📍 {address}</Text>

                        <Pressable style={styles.editBtn} onPress={goEdit}>
                            <Ionicons name="create-outline" size={18} color="#111" />
                            <Text style={styles.editTxt}>Edit</Text>
                        </Pressable>

                        <Pressable style={styles.deleteBtn} onPress={onDelete}>
                            <Ionicons name="trash-outline" size={18} color="#fff" />
                            <Text style={styles.deleteTxt}>Delete</Text>
                        </Pressable>

                    </BlurView>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1, backgroundColor: '#000' },
    close: { position: 'absolute', top: 50, right: 25, padding: 8, zIndex: 2 },
    cardWrap: { position: 'absolute', left: 16, right: 16, bottom: 24 },
    card: {
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    time: { color: '#D1D5DB', marginBottom: 6, fontSize: 12 },
    title: { color: '#fff', fontSize: 24, fontWeight: '800', marginBottom: 8 },
    row: { color: '#E5E7EB', marginTop: 6 },
    editBtn: {
        marginTop: 14,
        backgroundColor: '#fff',
        borderRadius: 12,
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    editTxt: { color: '#111', fontWeight: '800' },

    deleteBtn: {
        marginTop: 10,
        backgroundColor: '#EF4444',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        flexDirection: 'row',
        gap: 6,
    },
    deleteTxt: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
