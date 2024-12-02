import HomeContainer from "@/containers/home";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return <HomeContainer user={data.user} />;
}
