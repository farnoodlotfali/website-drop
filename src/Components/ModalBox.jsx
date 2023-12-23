import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

//       WIDTH =
//   "max-w-xl" |
//   "max-w-2xl" |
//   "max-w-3xl" |
//   "max-w-4xl" |
//   "max-w-5xl" |
//   "max-w-6xl" |
//   "max-w-7xl" |
//   "max-w-0" |
//   "max-w-xs" |
//   "max-w-sm" |
//   "max-w-md" |
//   "max-w-lg" |
//   "max-w-none" |
//   "max-w-full" |
//   "max-w-fit";

const ModalBox = ({
  children,
  onClose,
  show,
  maxWidth = "max-w-2xl",
  needBack = true,
}) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={
                  needBack
                    ? `w-full ${maxWidth} transform overflow-visible rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all sm:p-6`
                    : ""
                }
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalBox;
