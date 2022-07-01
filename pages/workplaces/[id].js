
import Date from '../../components/date';
import Head from 'next/head'
import Layout from '../../components/layout';
import Container from '../../components/container'
import Intro from '../../components/intro'
import { getAllWorkplaceIds, getWorkplaceData } from '../../lib/workplaces';

export async function getStaticProps({ params }) {
  const postData = await getWorkplaceData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllWorkplaceIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Workplace({ postData, preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>{`${postData.title} at ${postData.company}`}</title>
      </Head>
      <Container>
        <Intro title={`${postData.title} at ${postData.company}`} description={postData.abstract} />
      </Container>
      <Container>
        <article>
          <h1 className="">{postData.title}</h1>
          <div className="">
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Container>
    </Layout>
  );
}