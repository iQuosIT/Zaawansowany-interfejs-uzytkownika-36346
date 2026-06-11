import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import MultiStepForm from '../components/auth/MultiStepForm';
export default function RegisterPage() {
    const navigate = useNavigate();
    return (_jsx(PageTransition, { children: _jsx(MultiStepForm, { onCancel: () => navigate('/') }) }));
}
