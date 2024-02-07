import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/prisma';
import { Status } from '@prisma/client';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';
import IssuesToolbar from './IssuesToolbar';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

interface SearchParams {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: SearchParams) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.map((name) => name).includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: searchParams.order,
      }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma?.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <Flex direction="column" gap="3">
      <IssuesToolbar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        itemCount={issueCount}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;

export const metadata: Metadata = {
  title: 'Issue List',
  description: 'View all project issues',
};
