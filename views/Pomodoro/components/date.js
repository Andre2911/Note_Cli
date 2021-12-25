import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text } from 'react-native';

const TimerText = ({ seconds, start }) => {

    const [timeLeft, setTimeLeft] = useState(seconds);
  
    useEffect(() => {
      // exit early when we reach 0
      if (!timeLeft) return;
  
      // save intervalId to clear the interval when the
      // component re-renders

        const intervalId = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
  
        return () => clearInterval(intervalId);
      
          // add timeLeft as a dependency to re-rerun the effect
          // when we update it
    }, [timeLeft]);
  
    return (
      <View>
        <Text style={styles.text}>{timeLeft}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 30
    }
})

export default TimerText;