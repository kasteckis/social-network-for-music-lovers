<?php


namespace App\Service;


use App\Entity\ChatMessage;
use Doctrine\ORM\EntityManagerInterface;

class ChatMessageService
{
    private EntityManagerInterface $entityManager;

    /**
     * ChatMessageService constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function chatMessageEntityToArray(ChatMessage $chatMessage): array
    {
        return [
            'id' => $chatMessage->getId(),
            'username' => $chatMessage->getUser()->getName(),
            'message' => $chatMessage->getMessage(),
            'date' => $chatMessage->getCreatedAt()->format('Y-m-d H:i:s')
        ];
    }

    public function getLast10ChatMessages(): array
    {
        $chatMessages = $this->entityManager->getRepository(ChatMessage::class)->findBy([], [
            'createdAt' => 'DESC'
        ], 10);

        $chatMessagesArray = [];

        // TODO: pafixint timezone
        foreach ($chatMessages as $chatMessage) {
            $chatMessagesArray[] = $this->chatMessageEntityToArray($chatMessage);
        }

        return array_reverse($chatMessagesArray);
    }
}
