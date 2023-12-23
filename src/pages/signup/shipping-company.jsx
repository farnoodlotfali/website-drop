import SignUpForm from "@/Components/SignUpForm";
import CircleLayout from "@/Layouts/CircleLayout";
import { SIGN_UP_TYPES_KEYS } from "@/constants/Const";

const ShippingCompanySignUp = () => {
  return (
    <>
      <SignUpForm type={SIGN_UP_TYPES_KEYS.company} />
    </>
  );
};

ShippingCompanySignUp.PageLayout = CircleLayout;

export default ShippingCompanySignUp;
