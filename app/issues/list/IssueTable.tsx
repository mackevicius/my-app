import { IssueStatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import NextLink from 'next/link';

export type SortOrder = 'asc' | 'desc';
export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  order: SortOrder | undefined;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  const getCurrentOrder = (): SortOrder | undefined => {
    const order = searchParams.order;
    if (order) {
      if (order === 'desc') return undefined;
      return 'desc';
    }
    return 'asc';
  };
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((i) => (
            <Table.ColumnHeaderCell key={i.value} className={i.className}>
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: i.value,
                    order: getCurrentOrder(),
                  },
                }}
              >
                {i.label}
              </NextLink>
              {i.value === searchParams.orderBy &&
                searchParams.order === 'asc' && (
                  <ArrowUpIcon className="inline" />
                )}
              {i.value === searchParams.orderBy &&
                searchParams.order === 'desc' && (
                  <ArrowDownIcon className="inline" />
                )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues?.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: 'Issue', value: 'description' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
