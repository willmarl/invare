import Modal from "./Modal";
import { useModalStore } from "../../stores/useModalStore";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { apiV1 } from "../../utils/kyClient";
// import { useCreateModule } from "../../hooks/useModules";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Plus, X } from "lucide-react";
import "./AddNewModal.css";
import ImageInputRHF from "../ImageInput/ImageInputRHF";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  model: yup.string(),
  description: yup.string(),
  category: yup.array().of(yup.string()),
  exampleIdeas: yup.array().of(yup.string()),
  codesnippet_cpp: yup.string(),
  codesnippet_python: yup.string(),
});

function AddNewModal() {
  const isOpen = useModalStore((s) => s.activeModal);
  const onClose = useModalStore((s) => s.closeModal);
  const [showPreview, setShowPreview] = useState(false);
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

  const cppCode = watch("codesnippet_cpp");
  const pythonCode = watch("codesnippet_python");

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

  const [isCreating, setIsCreating] = useState(false);

  const onSubmit = async (data) => {
    setIsCreating(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("model", data.model || "");
      formData.append("description", data.description || "");
      formData.append("category", JSON.stringify(data.category || []));
      formData.append("exampleIdeas", JSON.stringify(data.exampleIdeas || []));
      formData.append(
        "codeSnippets",
        JSON.stringify({
          cpp: data.codesnippet_cpp || "",
          python: data.codesnippet_python || "",
        })
      );
      if (data.image instanceof File) {
        formData.append("file", data.image);
      }

      // Use ky client for file upload (auto adds Authorization header)
      const res = await apiV1.post("modules", {
        body: formData,
        credentials: "include",
      });
      if (!res.ok && res.status !== 201) {
        let err = {};
        try {
          err = await res.json();
        } catch {}
        throw new Error(err.message || "Failed to create module");
      }
      onClose();
      reset();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to create module", err);
      // Optionally show error to user
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload New Module">
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
          <label className="addnew-modal__label">
            Module Image<span className="addnew-modal__required">*</span>
          </label>
          <ImageInputRHF
            name="image"
            setValue={setValue}
            watch={watch}
            error={errors.image}
          />
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
              <Plus size={18} />
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
                <span className="addnew-modal__chip-delete">
                  <X size={16} />
                </span>
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
              <Plus size={18} />
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
                <span className="addnew-modal__chip-delete">
                  <X size={16} />
                </span>
              </span>
            ))}
          </div>
        </div>
        {!showPreview && (
          <div>
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
          </div>
        )}
        {showPreview && (
          <div className="addnew-modal__preview">
            {!cppCode && !pythonCode ? (
              <div className="addnew-modal__codesnippet addnew-modal__codesnippet--empty">
                <span className="addnew-modal__codesnippet-empty-msg">
                  No code examples provided yet.
                </span>
              </div>
            ) : (
              <>
                {cppCode && (
                  <div className="addnew-modal__codesnippet">
                    <div className="addnew-modal__codesnippet-label">
                      C++ Example
                    </div>
                    <SyntaxHighlighter language="cpp">
                      {cppCode}
                    </SyntaxHighlighter>
                  </div>
                )}
                {pythonCode && (
                  <div className="addnew-modal__codesnippet">
                    <div className="addnew-modal__codesnippet-label">
                      Python Example
                    </div>
                    <SyntaxHighlighter language="python">
                      {pythonCode}
                    </SyntaxHighlighter>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        <div className="addnew-modal__actions">
          <button
            type="button"
            className="addnew-modal__button"
            onClick={() => setShowPreview((v) => !v)}
          >
            {showPreview ? "Hide" : "Show"} Code Preview
          </button>
          <button
            type="submit"
            className={`addnew-modal__button addnew-modal__button--primary${
              !isValid || showPreview || isCreating
                ? " addnew-modal__button--disabled"
                : ""
            }`}
            disabled={!isValid || showPreview || isCreating}
            aria-disabled={!isValid || showPreview || isCreating}
            title={
              !isValid
                ? "Please fill all required fields"
                : isCreating
                ? "Submitting..."
                : undefined
            }
          >
            {isCreating ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddNewModal;
