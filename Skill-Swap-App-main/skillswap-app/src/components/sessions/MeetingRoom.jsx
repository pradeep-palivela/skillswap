import React from "react";

const MeetingRoom = ({ meetingLink, onClose }) => {
  const isJitsi = meetingLink && meetingLink.includes("meet.jit.si");

  if (!meetingLink) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-[90%] h-[90%] overflow-hidden">
        <div className="flex justify-between items-center p-2 border-b">
          <h3 className="font-semibold">Live Meeting</h3>
          <div className="space-x-2">
            <button
              className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700"
              onClick={() => window.open(meetingLink, "_blank")}
            >
              Open in new tab
            </button>
            <button
              className="px-3 py-1 rounded bg-red-500 text-white"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>

        <div className="w-full h-full">
          {isJitsi ? (
            <iframe
              title="jitsi-meeting"
              src={meetingLink}
              className="w-full h-full border-0"
            />
          ) : (
            <div className="p-6 text-center text-gray-700 dark:text-gray-200">
              <p className="mb-4">This meeting will open in a new tab.</p>
              <a
                href={meetingLink}
                target="_blank"
                rel="noreferrer"
                className="underline text-indigo-600"
              >
                Join Meeting
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
