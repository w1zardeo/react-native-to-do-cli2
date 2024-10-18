import React from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import Checkbox from './Checkbox';
import ThemeStylesTasks from '../theme/ThemeStylesTasks'

// Функція для отримання смайлика на основі категорії
const getCategoryEmoji = (category) => {
  switch (category) {
    case 'Finance':
      return '💰';
    case 'Weeding':
      return '💍';
    case 'Freelance':
      return '💻';
    case 'Shopping List':
      return '🛒';
    default:
      return '';
  }
};

const Tasks = ({ tasks, toggleTask, deleteTask, updateTaskText, isDarkMode }) => {
  const themeStylesTasks= ThemeStylesTasks({ isDarkMode }); // Використовуємо компонент для стилів
  const handleTextChange = (text, index, section) => {
    if (text === '') {
      deleteTask(index, section);
    } else {
      updateTaskText(index, section, text);
    }
  };

  return (
    <View style={styles.tasks}>
      {/* Incomplete Section */}
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, themeStylesTasks.sectionStyle]}>Incomplete</Text>
        {tasks.incomplete.length === 0 && (
          <Text style={styles.smallGap}>Click + to add a task</Text>
        )}
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={tasks.incomplete}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.taskContainer}>
              <Checkbox
              isDarkMode={isDarkMode}
                checked={item.completed}
                onChange={() => toggleTask(index, 'incomplete')}
                label={
                  <View style={styles.textContainer}>
                    <TextInput
                      value={item.text}
                      onChangeText={(text) => handleTextChange(text, index, 'incomplete')}
                      style={[styles.taskText, themeStylesTasks.textStyle]}
                      // multiline={true}
                      numberOfLines={1}
                      maxLength={100}
                    />
                    <Text style={[styles.categoryText]}>
                      {getCategoryEmoji(item.category)} {item.category}
                    </Text>
                  </View>
                }
              />
            </View>
          )}
          contentContainerStyle={styles.flatList}
          ItemSeparatorComponent={null}
          scrollEnabled={false}
        />
      </View>

      {/* Completed Section */}
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, themeStylesTasks.sectionStyle]}>Completed</Text>
        {tasks.complete.length === 0 && (
          <Text style={styles.smallGap}>Mark a task done to get it completed</Text>
        )}
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={tasks.complete}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.taskContainer}>
              <Checkbox
              isDarkMode={isDarkMode}
                checked={item.completed}
                onChange={() => toggleTask(index, 'complete')}
                label={
                  <View style={styles.textContainer}>
                    <Text
                      style={[styles.taskText, styles.completedTaskText, themeStylesTasks.completedTaskStyle]}
                      // multiline={true}
                      numberOfLines={1}
                      maxLength={100}
                    >{item.text}</Text>
                    {/* Не відображаємо категорію для виконаних завдань */}
                  </View>
                }
              />
            </View>
          )}
          contentContainerStyle={styles.flatList}
          ItemSeparatorComponent={null}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tasks: {
    flex: 1,
    width: '100%',
    padding: 0,
  },
  sectionContainer: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DADADA',
    fontFamily: 'inter',
    marginTop: 16,
    marginLeft: 18,
  },
  smallGap: {
    color: '#575767',
    fontSize: 14,
    marginBottom: 0,
    fontFamily: 'inter',
    fontWeight: 'bold',
    marginLeft: 18,
  },
  flatList: {
    padding: 0,
    margin: 0,
  },
  listContainer: {
    flexGrow: 0,
    marginBottom: 0,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    width: '100%',
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    flex: 1,
    width: '100%',
    flexWrap: 'wrap',
  },
  taskText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    width: 350
  },
  completedTaskText: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    paddingBottom: 18,
  },
  categoryText: {
    color: '#575767',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default Tasks;
