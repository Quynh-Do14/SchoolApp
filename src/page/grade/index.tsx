import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import MainLayout from '../../infrastructure/common/layouts/layout';
import gradeService from '../../infrastructure/repositories/grade/grade.service';
import LoadingFullScreen from '../../infrastructure/common/components/controls/loading';
import { useIsFocused } from '@react-navigation/native';

function GradeScreen() {
    const [loading, setLoading] = useState<boolean>(false);
    const [gradeList, setGradeList] = useState<any[]>([]);
    const [gpa, setGPA] = useState<any[]>([]);

    const getGradeListAsync = async () => {
        try {
            await gradeService.getGradeByUser(
                setLoading,
            ).then((response) => {
                if (response) {
                    setGradeList(response)
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
    const getGradeGPAAsync = async () => {
        try {
            await gradeService.getGrade(
                setLoading,
            ).then((response) => {
                if (response) {
                    setGPA(response)
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getGradeListAsync().then(() => { });
        getGradeGPAAsync().then(() => { });
    }, []);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getGradeListAsync().then(() => { });
            getGradeGPAAsync().then(() => { });
        }
    }, [isFocused]);

    const renderItem = ({ item }: any) => (
        <View style={styles.row}>
            <Text style={[styles.cell, styles.subject]}>{item.courseName}</Text>
            <Text style={styles.cell}>{item.midtermScore}</Text>
            <Text style={styles.cell}>{item.finalScore}</Text>
            <Text style={[styles.cell, styles.bold]}>{item.totalScore} - {item.grade || "F"}</Text>
        </View>
    );

    return (
        <MainLayout title={'Xem điểm'}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={[styles.row, styles.header]}>
                        <Text style={[styles.cell, styles.subject]}>Môn</Text>
                        <Text style={styles.cell}>B</Text>
                        <Text style={styles.cell}>A</Text>
                        <Text style={[styles.cell, styles.bold]}>Tổng</Text>
                    </View>

                    <FlatList
                        data={gradeList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.id}
                    />
                </View>


                <View style={styles.gpaContainer}>
                    <Text style={styles.gpaLabel}>GPA</Text>
                    <Text style={styles.gpaValue}>{Number(gpa).toFixed(2

                    )}</Text>
                </View>
            </View>
            <LoadingFullScreen loading={loading} />
        </MainLayout>
    );
}
export default GradeScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        gap: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    content: {
        padding: 12,
        borderRadius: 16,
        backgroundColor: '#E8EAEC',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
    },
    subject: {
        flex: 2,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    bold: {
        fontWeight: 'bold',
    },
    gpaContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    gpaLabel: {
        fontWeight: 'bold',
        color: 'crimson',
        marginRight: 8,
        fontSize: 16,
    },
    gpaValue: {
        fontWeight: 'bold',
        color: 'crimson',
        fontSize: 16,
    },
});
