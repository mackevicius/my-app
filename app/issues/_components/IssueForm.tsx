'use client';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import dynamic from 'next/dynamic';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitIssue = handleSubmit(
    async (data: IssueFormData): Promise<void> => {
      setLoading(true);
      try {
        if (issue) {
          await axios.patch('/api/issues/' + issue.id, data);
        } else {
          await axios.post('/api/issues', data);
        }
        router.push('/issues');
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('An unexpected error occured');
      }
    }
  );

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmitIssue}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description || ''}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={loading}>
          {issue ? 'Update' : 'Submit New'} Issue{loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
