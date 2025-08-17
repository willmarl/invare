import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useModalStore } from "../../stores/useModalStore";
import { useModule, useUpdateModule } from "../../hooks/useModules";
import Modal from "./Modal";
import FileUploaderRHF from "../FileUploader/FileUploaderRHF";
import "./EditModal.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  model: yup.string(),
  description: yup.string(),
  category: yup.array().of(yup.string()),
  exampleIdeas: yup.array().of(yup.string()),
  codesnippet_cpp: yup.string(),
  codesnippet_python: yup.string(),
});

function EditModal() {
  const isOpen = useModalStore((s) => s.activeModal);
  const onClose = useModalStore((s) => s.closeModal);
  const modalData = useModalStore((s) => s.modalData);
  const moduleId = modalData?.moduleId;
  const { data: module, isLoading } = useModule(moduleId);
  const { mutate: updateModule, isLoading: isUpdating } = useUpdateModule();

  const [categoryInput, setCategoryInput] = useState("");
  const [exampleIdeaInput, setExampleIdeaInput] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      model: "",
      description: "",
      category: [],
      exampleIdeas: [],
      codesnippet_cpp: "",
      codesnippet_python: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (module) {
      reset({
        name: module.name || "",
        model: module.model || "",
        description: module.description || "",
        category: module.category || [],
        exampleIdeas: module.exampleIdeas || [],
        codesnippet_cpp: module.codeSnippets?.cpp || "",
        codesnippet_python: module.codeSnippets?.python || "",
      });
    }
  }, [module, reset]);

  function handleAddCategory() {
    const val = categoryInput.trim();
    if (!val) return;
    const current = getValues("category") || [];
    if (!current.includes(val)) {
      setValue("category", [...current, val]);
    }
    setCategoryInput("");
  }

  function handleRemoveCategory(idx) {
    const current = getValues("category") || [];
    setValue(
      "category",
      current.filter((_, i) => i !== idx)
    );
  }

  function handleAddExampleIdea() {
    const val = exampleIdeaInput.trim();
    if (!val) return;
    const current = getValues("exampleIdeas") || [];
    if (!current.includes(val)) {
      setValue("exampleIdeas", [...current, val]);
    }
    setExampleIdeaInput("");
  }

  function handleRemoveExampleIdea(idx) {
    const current = getValues("exampleIdeas") || [];
    setValue(
      "exampleIdeas",
      current.filter((_, i) => i !== idx)
    );
  }

  const onSubmit = (data) => {
    if (!moduleId) return;
    updateModule(
      {
        moduleId,
        data: {
          name: data.name,
          model: data.model,
          description: data.description,
          category: data.category,
          exampleIdeas: data.exampleIdeas,
          codeSnippets: {
            cpp: data.codesnippet_cpp,
            python: data.codesnippet_python,
          },
        },
      },
      {
        onSuccess: onClose,
      }
    );
  };

  if (!isOpen || !module) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Module">
      <form className="addnew-modal__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="addnew-modal__field">
          <label className="addnew-modal__label">
            Name<span className="addnew-modal__required">*</span>
          </label>
          <input className="addnew-modal__input" {...register("name")} />
          {errors.name && (
            <span className="addnew-modal__error">{errors.name.message}</span>
          )}
        </div>
        <div className="addnew-modal__field">
          <label className="addnew-modal__label">Model</label>
          <input className="addnew-modal__input" {...register("model")} />
        </div>
        <div className="addnew-modal__field">
          <label className="addnew-modal__label">Description</label>
          <textarea
            className="addnew-modal__textarea"
            rows={2}
            {...register("description")}
          />
        </div>
        <div className="addnew-modal__field">
          <label className="addnew-modal__label">Category</label>
          <div className="addnew-modal__chipinput">
            <input
              className="addnew-modal__input"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              placeholder="Add category and press +"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddCategory();
                }
              }}
            />
            <button
              type="button"
              className="addnew-modal__chipinput-btn"
              onClick={handleAddCategory}
              title="Add category"
              disabled={
                !categoryInput.trim() ||
                (getValues("category") || []).includes(categoryInput.trim())
              }
            >
              +
            </button>
          </div>
          <div className="addnew-modal__chiplist">
            {watch("category")?.map((cat, idx) => (
              <span
                key={cat + idx}
                className="addnew-modal__chip"
                title="Remove"
                onClick={() => handleRemoveCategory(idx)}
              >
                {cat}
                <span className="addnew-modal__chip-delete">×</span>
              </span>
            ))}
          </div>
        </div>
        <div className="addnew-modal__field">
          <label className="addnew-modal__label">Example Ideas</label>
          <div className="addnew-modal__chipinput">
            <input
              className="addnew-modal__input"
              value={exampleIdeaInput}
              onChange={(e) => setExampleIdeaInput(e.target.value)}
              placeholder="Add idea and press +"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddExampleIdea();
                }
              }}
            />
            <button
              type="button"
              className="addnew-modal__chipinput-btn"
              onClick={handleAddExampleIdea}
              title="Add idea"
              disabled={
                !exampleIdeaInput.trim() ||
                (getValues("exampleIdeas") || []).includes(
                  exampleIdeaInput.trim()
                )
              }
            >
              +
            </button>
          </div>
          <div className="addnew-modal__chiplist">
            {watch("exampleIdeas")?.map((idea, idx) => (
              <span
                key={idea + idx}
                className="addnew-modal__chip"
                title="Remove"
                onClick={() => handleRemoveExampleIdea(idx)}
              >
                {idea}
                <span className="addnew-modal__chip-delete">×</span>
              </span>
            ))}
          </div>
        </div>
        <div className="addnew-modal__field">
          <label className="addnew-modal__label">C++ Code Example</label>
          <Controller
            name="codesnippet_cpp"
            control={control}
            render={({ field }) => (
              <textarea
                className="addnew-modal__textarea addnew-modal__textarea--code"
                rows={4}
                {...field}
                placeholder="Paste C++ code here..."
              />
            )}
          />
        </div>
        <div className="addnew-modal__field">
          <label className="addnew-modal__label">Python Code Example</label>
          <Controller
            name="codesnippet_python"
            control={control}
            render={({ field }) => (
              <textarea
                className="addnew-modal__textarea addnew-modal__textarea--code"
                rows={4}
                {...field}
                placeholder="Paste Python code here..."
              />
            )}
          />
        </div>
        <div className="addnew-modal__actions">
          <button
            type="submit"
            className={`addnew-modal__button addnew-modal__button--primary${
              !isValid || isUpdating ? " addnew-modal__button--disabled" : ""
            }`}
            disabled={!isValid || isUpdating}
            aria-disabled={!isValid || isUpdating}
            title={
              !isValid
                ? "Please fill all required fields"
                : isUpdating
                ? "Saving..."
                : undefined
            }
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="addnew-modal__button"
            onClick={onClose}
            disabled={isUpdating}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditModal;
