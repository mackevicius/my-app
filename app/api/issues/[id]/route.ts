import { issueSchema } from '@/app/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = prisma?.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) return NextResponse.json('Issue not found', { status: 400 });

  const updatedIssue = await prisma?.issue.update({
    where: { id: parseInt(params.id) },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  await prisma.issue.delete({ where: { id: issue.id } });

  return NextResponse.json({});
}
