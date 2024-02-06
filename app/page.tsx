import LatestIssues from './LatestIssues';
import IssueSummary from './IssueSummary';
import prisma from '@/prisma/prisma';
import IssueChart from './IssueChart';

export default async function Home() {
  const open = await prisma.issue.count({
    where: {
      status: 'OPEN',
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: 'CLOSED',
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: 'IN_PROGRESS',
    },
  });

  return (
    <>
      <IssueSummary open={open} closed={closed} inProgress={inProgress} />
      <LatestIssues />
      <IssueChart open={open} closed={closed} inProgress={inProgress} />
    </>
  );
}
