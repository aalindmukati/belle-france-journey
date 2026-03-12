import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import FranceMap3D from "@/components/FranceMap3D";

const MapPage = () => (
  <Layout>
    <PageHeader title="Explore France" subtitle="Navigate the map to discover France's most captivating regions in 3D." />
    <section className="section-navy" style={{ height: "70vh", minHeight: 500 }}>
      <FranceMap3D />
    </section>
  </Layout>
);

export default MapPage;
