// src/components/Predictions.js
import { useEffect, useState } from 'react';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../services/firebase';

export default function Predictions() {
  const [cycles, setCycles] = useState([]);
  const [avgCycleLength, setAvgCycleLength] = useState(28); // Default

  useEffect(() => {
    const fetchCycles = async () => {
      const q = query(
        collection(db, 'periods'),
        where('userId', '==', auth.currentUser.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());
      setCycles(data);

      // Calculate average cycle length (simplified)
      if (data.length > 1) {
        const lengths = data.slice(1).map((cycle, i) => {
          const prevStart = new Date(data[i].startDate);
          const currStart = new Date(cycle.startDate);
          return (currStart - prevStart) / (1000 * 60 * 60 * 24); // Days
        });
        const avg = Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
        setAvgCycleLength(avg);
      }
    };
    fetchCycles();
  }, []);

  // Predict next period (start date + avg cycle length)
  const lastPeriod = cycles[cycles.length - 1];
  const nextPeriod = lastPeriod 
    ? new Date(lastPeriod.startDate).setDate(new Date(lastPeriod.startDate).getDate() + avgCycleLength)
    : null;

  return (
    <div>
      <h3>Next predicted period: {nextPeriod?.toLocaleDateString()}</h3>
      <p>Average cycle: {avgCycleLength} days</p>
    </div>
  );
}