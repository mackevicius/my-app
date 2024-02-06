import Pagination from './components/Pagination';

export default function Home({
  searchParams,
}: {
  searchParams: {
    page: string;
  };
}) {
  return (
    <Pagination
      currentPage={parseInt(searchParams.page) || 1}
      itemCount={100}
      pageSize={10}
    ></Pagination>
  );
}
