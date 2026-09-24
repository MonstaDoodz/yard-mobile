import { FoundationScreen } from '@/components/ui/foundation-screen';

export default function RidesFoundationScreen() {
  return (
    <FoundationScreen
      title="Rides"
      body="Customer ride retrieval is isolated behind the rides service. No provider or dispatch functionality belongs in this app."
    />
  );
}
