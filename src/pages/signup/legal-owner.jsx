import SignUpForm from "@/Components/SignUpForm";
import CircleLayout from "@/Layouts/CircleLayout";
import { SIGN_UP_TYPES_KEYS } from "@/constants/Const";

const LegalOwnerSignUp = () => {
  return (
    <>
      <SignUpForm type={SIGN_UP_TYPES_KEYS.legalOwner} />
    </>
  );
};

LegalOwnerSignUp.PageLayout = CircleLayout;

export default LegalOwnerSignUp;
