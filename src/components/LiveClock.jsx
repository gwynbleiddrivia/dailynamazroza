import React, { useState, useEffect } from 'react';
import Translator from './Translator.jsx'
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';



const LiveClock = () => {
  const dhakaTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });
  const [date, setDate] = useState(new Date(dhakaTime));
  
  const formattedTime = date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
	
  const translatedTime = Translator(formattedTime)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const dhakaTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });
      setDate(new Date(dhakaTime));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex gap-2">
      <div className="analog-clock font-little">
        <Clock
          value={date}
          renderNumbers={false}
          size={60}
          secondHandLength={0}
          secondHandWidth={0}
          hourHandWidth={1.5}
          minuteHandWidth={1.5}
          locale={'en-US'}
        />
      </div>
      <div className="digital-clock text-4xl border border-amber-400 bg-amber-400 px-5 ml-2 pt-1 rounded font-siyam-rupali">
        {
		translatedTime
	}
      </div>
    </div>
  );
};

export default LiveClock;
