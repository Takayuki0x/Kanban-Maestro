import {Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function WhatsNewModal(){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
      <>
        <Button onPress={onOpen} variant="light">What&apos;s New?</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" scrollBehavior="inside">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">What&apos;s New In Update 1?<Divider /></ModalHeader>
                <ModalBody>
                    <h1 className="font-bold">Features:</h1>
                    <ul className="list-disc px-4">
                        <li>Added a &apos;Whats New?&apos; button to help users identify what was added in recent updates.</li>
                        <li>Added the possibility to edit your board&apos;s name and description.</li>
                        <li>Added a label that reflects how many cards are in a column.</li>
                    </ul>
                    <h1 className="font-bold">UI/UX:</h1>
                    <ul className="list-disc px-4">
                        <li>Website no longer defaults to the &apos;Dashboard&apos; section, instead showing a description of the project.</li>
                        <li>Removed the &apos;About&apos; section.</li>
                        <li>Switched to &apos;Inter&apos; font.</li>
                        <li>Changed primary color to red.</li>
                    </ul>
                    <h1 className="font-bold">Bugs fixed:</h1>
                    <ul className="list-disc px-4">
                        <li>Fixed a bug where users could create new columns without a title or a color.</li>
                        <li>Fixed a bug where users could create new boards without a title or a description.</li>
                        <li>Fixed a bug where column&apos;s title and color wouldn&apos;t update accurately after editing them.</li>
                        <li>Fixed a bug where column&apos;s title and color would completely disappear after editing them.</li>
                        <li>Fixed a bug where users could edit columns and remove the title and the color.</li>
                    </ul>
                </ModalBody>
                <ModalFooter>
                  <Button onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
}
