import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import Header from '../components/Header'; 
import TaskModal from '../components/TaskModal';
import Tasks from '../components/Tasks'; 
import { useFonts } from 'expo-font';
import { Plus } from '../components/Plus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeStylesDay from '../theme/ThemeStylesDay';

const DayToDoScreen = ({ route, navigation }) => {
  const { selectedDate, updateTasksState, isDarkMode } = route.params; // Отримання вибраної дати та функції оновлення
  const [tasksByDate, setTasksByDate] = useState({});
  const [showModal, setShowModal] = useState(false);
  const themeStylesDay = ThemeStylesDay({ isDarkMode }); // Використовуємо компонент для стилів

  const [fontsLoaded] = useFonts({
    'inter': require('../assets/fonts/Inter.ttf'),
  });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasksByDate');
        if (storedTasks) {
          setTasksByDate(JSON.parse(storedTasks));
        }
      } catch (e) {
        console.log('Failed to load tasks.', e);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasksByDate', JSON.stringify(tasksByDate));

        // Перевіряємо, чи передано функцію updateTasksState
        if (updateTasksState) {
          updateTasksState(); // Викликаємо функцію для оновлення стану в CalendarScreen
        }
      } catch (e) {
        console.log('Failed to save tasks.', e);
      }
    };
    saveTasks();
  }, [tasksByDate, updateTasksState]);

  const tasks = tasksByDate[selectedDate] || { incomplete: [], complete: [] };

  const addTask = (newTask) => {
    setTasksByDate((prevTasksByDate) => ({
      ...prevTasksByDate,
      [selectedDate]: {
        ...tasks,
        incomplete: [...tasks.incomplete, { ...newTask, completed: false }],
      },
    }));
    setShowModal(false);
  };
  
  const toggleTask = (index, type) => {
    const updatedTasks = { ...tasks };
    if (type === 'incomplete') {
      const completedTask = updatedTasks.incomplete.splice(index, 1)[0];
      updatedTasks.complete.push({ ...completedTask, completed: true });
    } else {
      const incompleteTask = updatedTasks.complete.splice(index, 1)[0];
      updatedTasks.incomplete.push({ ...incompleteTask, completed: false });
    }
    setTasksByDate((prevTasksByDate) => ({
      ...prevTasksByDate,
      [selectedDate]: updatedTasks,
    }));
  };

  const updateTaskText = (index, type, newText) => {
    const updatedTasks = { ...tasks };
    updatedTasks[type][index].text = newText;
    setTasksByDate((prevTasksByDate) => ({
      ...prevTasksByDate,
      [selectedDate]: updatedTasks,
    }));
  };

  const deleteTask = (index, type) => {
    const updatedTasks = { ...tasks };
    updatedTasks[type].splice(index, 1);
    setTasksByDate((prevTasksByDate) => ({
      ...prevTasksByDate,
      [selectedDate]: updatedTasks,
    }));
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#007BFF" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={[styles.container, themeStylesDay.containerStyle]}>
      <Header
        incompleteCount={tasks.incomplete.length}
        completeCount={tasks.complete.length}
        navigation={navigation}
        selectedDate={selectedDate}
        isDarkMode={isDarkMode}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Tasks 
          tasks={tasks} 
          toggleTask={toggleTask} 
          deleteTask={deleteTask} 
          updateTaskText={updateTaskText} 
          isDarkMode={isDarkMode}
        />
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress={() => setShowModal(true)}>
        <View>
          <Plus />
        </View>
      </TouchableOpacity>
      <TaskModal visible={showModal} onAddTask={addTask} onClose={() => setShowModal(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141419',
  },
  content: {
    paddingBottom: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#3F4EA0',
    borderWidth: 2,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#515CC6',
  },
});

export default DayToDoScreen;
