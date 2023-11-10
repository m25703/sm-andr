import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WeekScreen = () => {
  const [expandedDays, setExpandedDays] = useState([false, false, false, false, false, false, false]);
  const [expandedTimings, setExpandedTimings] = useState([
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ]);

  const toggleDay = (index) => {
    const updatedExpandedDays = [...expandedDays];
    updatedExpandedDays[index] = !updatedExpandedDays[index];
    setExpandedDays(updatedExpandedDays);
  };

  const toggleTiming = (dayIndex, timingIndex) => {
    const updatedExpandedTimings = [...expandedTimings];
    updatedExpandedTimings[dayIndex][timingIndex] = !updatedExpandedTimings[dayIndex][timingIndex];
    setExpandedTimings(updatedExpandedTimings);
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timings = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];

  return (
    <View style={styles.container}>
      {daysOfWeek.map((day, dayIndex) => (
        <TouchableOpacity key={dayIndex} style={styles.dayBox} onPress={() => toggleDay(dayIndex)}>
          <Text style={styles.dayText}>{day}</Text>
          {expandedDays[dayIndex] && (
            <View style={styles.timingContainer}>
              {timings.map((timing, timingIndex) => (
                <TouchableOpacity
                  key={timingIndex}
                  style={styles.timingBox}
                  onPress={() => toggleTiming(dayIndex, timingIndex)}
                >
                  <Text style={styles.timingText}>{timing}</Text>
                  {expandedTimings[dayIndex][timingIndex] && (
                    <Text style={styles.sampleText}>
                      This is sample text for {day}, {timing} when expanded.
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayBox: {
    width: '90%',
    backgroundColor: '#E0E0E0',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timingContainer: {
    flexDirection: 'column',
    width: '80%',
  },
  timingBox: {
    width: '80%',
    backgroundColor: '#E0E0E0',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timingText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sampleText: {
    marginTop: 10,
    fontSize: 14,
    color: 'blue',
  },
});

export default WeekScreen;
