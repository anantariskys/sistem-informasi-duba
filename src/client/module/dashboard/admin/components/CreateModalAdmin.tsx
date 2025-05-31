import FormModal from '@/client/components/FormModal';
import Input from '@/client/components/Input';
import useCreateAdmin from '../hooks/useCreateAdmin';

interface CreateModalPJProps {
  isShow: boolean;
  onClose: () => void;
  //   onSubmit: (data: PJPayload) => Promise<void>;
}

export default function CreateModalAdmin({
  isShow,
  onClose,
}: //   onSubmit,
CreateModalPJProps) {
  const { form, isSubmitting, onSubmit } = useCreateAdmin(onClose);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <FormModal
      show={isShow}
      title="Tambahkan Admin"
      onClose={()=>{
        form.reset()
        onClose() 
      }}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <div className="space-y-4">
        <Input
          label="Nama Lengkap"
          placeholder="Contoh: John Doe"
          error={errors.name?.message}
          {...register('name')}
          required
        />
        <Input
          label="Email"
          placeholder="Contoh: johndoe@email.com"
          error={errors.email?.message}
          {...register('email')}
          required
        />
        <Input
          label="Password"
          placeholder="Masukkan password"
          error={errors.password?.message}
          {...register('password')}
          required
        />
      </div>
    </FormModal>
  );
}
