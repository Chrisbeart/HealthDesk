"use client"

import { useRouter } from 'next/navigation';

const PatientenProfil = () => {
  const router = useRouter();
  const query = router.query; // Check if router.query is correctly initialized

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Medizinische Informationen');
  const [subTab, setSubTab] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!query.id) {
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching data for patient ID: ${query.id}`); // Debug log

        const response = await fetch(`/api/getPatient?patientId=${query.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch patient data: ${response.statusText}`);
        }
        const data = await response.json();

        if (data.patient) {
          setPatient(data.patient);
        } else {
          setError('Patient not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [query.id]);

  if (loading) {
    return <div>Loading patient data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!patient) {
    return <div>No patient data found</div>;
  }

  // Render the rest of your component
};
