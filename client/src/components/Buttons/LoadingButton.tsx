import Styles from './LoadingButton.module.css';

interface LoadingButtonProps {
  isLoading: boolean;
  onClick: (e: any) => void | Promise<void>
  text: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ isLoading, onClick, text}) => {
  
  const handleClick = async (e:any) => {
    e.preventDefault();
    console.log('clicked');
    await onClick(e);
  };

  return (
    <button
      className={`${isLoading ? " bg-primary" : "bg-primary/90"} font-semibold bg-primary hover:bg-primary/90 rounded-xl min-w-[82px] flex items-center justify-center w-full text-center text-white h-12 py-2 px-4 focus:outline-none focus:shadow-outline}`}
      onClick={handleClick}
    >
      {isLoading ? (
        <div className={Styles.dotFlashing}>
        </div>
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
};


export default LoadingButton;
