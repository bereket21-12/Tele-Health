import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Import your Firestore configuration

const fetchUserChallenges = async (participantId) => {
  try {

    const q = query(collection(db, 'challenges'), where('participants', 'array-contains', participantId));
    const querySnapshot = await getDocs(q);
    const challenges = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return challenges;
    
  } catch (error) {
    throw new Error('Error fetching user challenges: ' + error.message);
  }
};

export default fetchUserChallenges;
