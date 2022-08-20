import { useState } from "react";

type Status = {
  type: 'success' | 'error';
  message: string;
}
export const useStatus = () => {
  const [status, setStatus] = useState<Status | undefined>(undefined);
  const statusSetter = (type: Status["type"], message: Status["message"]) => {
    setStatus({ type, message })
  }
  return [status, statusSetter] as const;
}