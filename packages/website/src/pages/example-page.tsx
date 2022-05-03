import { ExamplePageProps } from "@/components/ExamplePage";
import { MockData } from "@/components/ExamplePage/mockData";
import { parseMd } from "@/components/Mdx/MdxRemote";

export async function getStaticProps() {
  const data = MockData;

  const props: ExamplePageProps = { data: MockData, mdx: await parseMd(data) };

  return { props };
}

export { ExamplePage as default } from "@/components/ExamplePage";
