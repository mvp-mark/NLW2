import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import { ScrollView, BorderlessButton, RectButton } from "react-native-gesture-handler";
import api from "../../services/api";


function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);


  const [isfiltersVisible, setIsFiltersVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

function loadFavorites(){

    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id
        })
        setFavorites(favoritedTeachersIds);
        
      }
    });

}

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isfiltersVisible);
  }

  async function handleFiltersSubmit() {
    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });
    console.log(response.data);
    loadFavorites();
    setIsFiltersVisible(false);
    setTeachers(response.data);

  }


  return (
    <View style={styles.container}>
      <PageHeader title="Proffys Disponiveis" headerRight={(
        <BorderlessButton onPress={handleToggleFiltersVisible} >
          <Feather name='filter' size={20} color='#FFF' />
        </BorderlessButton>

      )} >
        {isfiltersVisible && (


          <View style={styles.searchForm} >
            <Text style={styles.label}>Matéria </Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholderTextColor="#c1bccc"
              placeholder="Qual a matéria?" />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana </Text>
                <TextInput
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  placeholderTextColor="#c1bccc"
                  style={styles.input} placeholder="Qual o dia?" />
              </View>


              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário </Text>
                <TextInput
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholderTextColor="#c1bccc"
                  style={styles.input} placeholder="Qual horário?" />
              </View>
            </View>


            <RectButton style={styles.submitButton} onPress={handleFiltersSubmit} >
              <Text style={styles.submitButtonText}>Filtrar</Text>

            </RectButton>

          </View>
        )}
      </PageHeader>
      <ScrollView style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24
        }}
      >
        {
          teachers.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />)
        }

      </ScrollView>

    </View>

  );
}

export default TeacherList;
