'use client';
import { TextField, Button, Callout } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import { IssueForm } from '@/model/issueForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const handleSubmitIssue = async (data: IssueForm): Promise<void> => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (err) {
      setError('An unexpected error occured');
    }
  };

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => handleSubmitIssue(data))}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        <Controller
          name="description"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
