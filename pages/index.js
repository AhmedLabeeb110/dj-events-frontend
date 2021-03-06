import Link from "next/link"
import Layout from "./components/Layout";
import Eventitem from "./components/Eventitem";
import { API_URL } from "../pages/config/index";

export default function Home({events}) {
  console.log(events)
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <Eventitem key={evt.id} evt={evt}/>
      ))}

      {events.length > 0 && (
        <Link href='/events'>
           <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  return {
    props: { events: events.slice(0, 3) },
    revalidate: 1
  };
}
