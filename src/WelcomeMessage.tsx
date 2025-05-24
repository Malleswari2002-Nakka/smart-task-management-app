interface Props {
  name: string;
}

const WelcomeMessage = ({ name }: Props) => {
  return <div style={{ color: "white" }}>Welcome {name}</div>;
};

export default WelcomeMessage;
