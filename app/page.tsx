import LatestIssues from './LatestIssues';
import IssueSummary from './issues/IssueSummary';
import prisma from '@/prisma/prisma';

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
    </>
  );
}
