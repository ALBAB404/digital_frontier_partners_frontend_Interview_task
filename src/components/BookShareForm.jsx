import { useForm } from "react-hook-form";
import useAxios from '../hooks/useAxios';
import { Field } from "./Field";

const BookShareForm = ({ onSuccess, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const api = useAxios();
  const submitForm = async (data) => {
    try {
      const res = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/books`, data);
      if (res.status === 201) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        setError("title", { message: "Book already exists" });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="p-6">
      <div className="space-y-4">
      <Field
  label="Book Title"
  error={errors.title?.message}
  htmlFor="title"
  labelClassName="block text-sm font-medium text-gray-700 mb-2"
>
  <input
    id="title"
    type="text"
    {...register("title", { required: "Book Title is required" })}
    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
      errors.title ? "!border-red-500" : "border-gray-200"
    }`}
    placeholder="Enter book title"
  />
</Field>

<Field
  label="Author"
  error={errors.author?.message}
  htmlFor="author"
  labelClassName="block text-sm font-medium text-gray-700 mb-2"
>
  <input
    id="author"
    type="text"
    {...register("author", { required: "Author is required" })}
    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
      errors.author ? "!border-red-500" : "border-gray-200"
    }`}
    placeholder="Enter author name"
  />
</Field>

<Field
  label="Description"
  error={errors.description?.message}
  htmlFor="description"
  labelClassName="block text-sm font-medium text-gray-700 mb-2"
>
  <textarea
    id="description"
    rows="4"
    {...register("description", { required: "Description is required" })}
    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
      errors.description ? "!border-red-500" : "border-gray-200"
    }`}
    placeholder="Enter a brief description of the book"
  />
</Field>

      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Share Book
        </button>
      </div>
    </form>
  );
};

export default BookShareForm;
