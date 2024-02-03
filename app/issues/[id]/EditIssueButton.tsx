import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button className="flex items-start">
      <Pencil2Icon />
      <Link href={`/issues/${issueId}/edit`}> Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
