interface Props {
  name: string;
}
function WelcomeMessage({ name }: Props) {
  return (
    <div className="text-center mb-4 fs-2" style={{ fontWeight: "bold" }}>
      Welcome {name}
    </div>
  );
}

export default WelcomeMessage;
