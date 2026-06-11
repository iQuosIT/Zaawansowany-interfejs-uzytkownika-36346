import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import MultiStepForm from '../components/auth/MultiStepForm';

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <PageTransition>
      <MultiStepForm onCancel={() => navigate('/')} />
    </PageTransition>
  );
}
