import React, { useEffect, useState } from "react";
import api from "./services/api";
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get("/projects").then((response) => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post("/projects", {
            title: `New project ${Date.now()}`,
            owner: "Jonas Zanini",
        });

        setProjects([...projects, response.data]);
    }

    return (
        <>
            <StatusBar backgroundColor="#7159c1" barStyle="default" />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={(projects) => projects.id}
                    renderItem={({ item: project }) => <Text style={styles.project}>{project.title}</Text>}
                />

                <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleAddProject}>
                    <Text style={styles.buttonText}>Add projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7159c1",
    },
    project: {
        color: "#fff",
        fontSize: 30,
    },
    button: {
        backgroundColor: "#fff",
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 16,
    },
});
