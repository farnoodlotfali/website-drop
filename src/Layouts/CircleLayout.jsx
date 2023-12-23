const CircleLayout = ({ children }) => {
  return (
    <div
      className="relative flex h-full min-h-screen items-center justify-center overflow-hidden bg-primary-900  
      
    before:absolute before:bottom-[-180px] before:right-[-140px] before:h-[350px] before:w-[350px] before:rounded-full 
    before:border-[80px] before:border-solid before:border-primary-800
    
    after:absolute after:left-[-140px] after:top-[-180px] after:h-[350px] after:w-[350px] after:rounded-full 
    after:border-[80px] after:border-solid after:border-primary-800
    "
    >
      {children}
    </div>
  );
};

export default CircleLayout;
