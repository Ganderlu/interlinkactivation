import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  type Firestore,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import {
  DEFAULT_SETTINGS,
  type PlatformSettings,
} from "@/types";

const SETTINGS_COLLECTION = "settings";
const SETTINGS_DOC = "platform";

export const getSettingsDoc = (firestore: Firestore) =>
  doc(firestore, SETTINGS_COLLECTION, SETTINGS_DOC);

/** Read settings once (falls back to defaults if none exist). */
export async function getSettings(): Promise<PlatformSettings> {
  if (!isFirebaseConfigured) return DEFAULT_SETTINGS;
  try {
    const snap = await getDoc(getSettingsDoc(db));
    if (snap.exists()) {
      return { ...DEFAULT_SETTINGS, ...(snap.data() as PlatformSettings) };
    }
    return DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** Subscribe to settings changes (live). Returns an unsubscribe function. */
export function onSettingsChange(
  cb: (settings: PlatformSettings) => void,
): () => void {
  if (!isFirebaseConfigured) {
    cb(DEFAULT_SETTINGS);
    return () => {};
  }
  return onSnapshot(
    getSettingsDoc(db),
    (snap) => {
      if (snap.exists()) {
        cb({ ...DEFAULT_SETTINGS, ...(snap.data() as PlatformSettings) });
      } else {
        cb(DEFAULT_SETTINGS);
      }
    },
    () => cb(DEFAULT_SETTINGS),
  );
}

/** Persist settings to Firestore. */
export async function saveSettings(
  settings: PlatformSettings,
): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await setDoc(getSettingsDoc(db), {
    ...settings,
    updatedAt: new Date().toISOString(),
  });
}
