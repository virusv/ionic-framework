import { ModalOptions, modalController } from '@ionic/core/components';
import { useCallback } from 'react';

import { ReactComponentOrElement } from '../models/ReactComponentOrElement';

import { HookOverlayOptions } from './HookOverlayOptions';
import { useOverlay } from './useOverlay';

/**
 * A hook for presenting/dismissing an IonModal component
 * @param component The component that the modal will show. Can be a React Component, a functional component, or a JSX Element
 * @param componentProps The props that will be passed to the component, if required
 * @returns Returns the present and dismiss methods in an array
 */
export function useIonModal(
  component: ReactComponentOrElement,
  componentProps?: any
): UseIonModalResult {
  const controller = useOverlay<ModalOptions, HTMLIonModalElement>(
    'IonModal',
    modalController,
    component,
    componentProps
  );

  const present = useCallback(
    (options: Omit<ModalOptions, 'component' | 'componentProps'> & HookOverlayOptions = {}) => {
      controller.present(options as any);
    },
    [controller.present]
  );

  return [present, controller.dismiss];
}

export type UseIonModalResult = [
  (options?: Omit<ModalOptions, 'component' | 'componentProps'> & HookOverlayOptions) => void,
  /**
   * Dismisses the modal
   */
  () => void
];
