import { Dispatch, useState } from "react";
type Text = {
  id: string;
  title: string;
};

type Props = {
  handleUpdateTask: () => void;
  editText: Text | null;
  setEditText: React.Dispatch<
    React.SetStateAction<{ id: string; title: string } | null>
  >;
};
export const UpdateDialog = ({
  handleUpdateTask,
  editText,
  setEditText,
}: Props) => {
  return (
    <div>
      {editText && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h3 className="text-lg font-bold mb-3 text-gray-800">
              Update Task
            </h3>
            <input
              type="text"
              value={editText.title}
              onChange={(e) =>
                setEditText({ ...editText, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditText(null)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTask}
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
