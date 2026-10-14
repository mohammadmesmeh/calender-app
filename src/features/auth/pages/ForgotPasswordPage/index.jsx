import { AuthLayout } from '../../components/AuthLayout';
import { AuthCard } from '../../components/AuthComponent/AuthCard';
import { ForgotPasswordForm } from '../../components/AuthComponent/ForgotPasswordForm';

export function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <ForgotPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
