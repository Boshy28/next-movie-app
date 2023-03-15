import ActorItem from '@/components/ActorItem';
import { BASE_URL } from '@/utils/constants';
import axios from 'axios';
import Head from 'next/head';

export default function Actor({ actor }) {
  return (
    <>
      <Head>
        <title>Actor - {actor.name}</title>
      </Head>

      <ActorItem {...actor} />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${BASE_URL}/api/actor?id=${query.id}`);

  return {
    props: {
      actor: data,
    },
  };
}
