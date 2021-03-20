<?php

namespace App\Controller;

use App\Entity\ChatMessage;
use App\Entity\User;
use App\Service\ChatMessageService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ChatMessageController extends AbstractController
{
    private ChatMessageService $chatMessageService;

    /**
     * ChatMessageController constructor.
     * @param ChatMessageService $chatMessageService
     */
    public function __construct(ChatMessageService $chatMessageService)
    {
        $this->chatMessageService = $chatMessageService;
    }

    /**
     * @Route("/api/chat-messages", name="chat_message", methods={"GET"})
     */
    public function getChatMessages(): Response
    {
        $chatMessages = $this->getDoctrine()->getRepository(ChatMessage::class)->findBy([], [
            'createdAt' => 'DESC'
        ], 10);

        $chatMessagesArray = [];

        // TODO: pafixint timezone
        foreach ($chatMessages as $chatMessage) {
            $chatMessagesArray[] = $this->chatMessageService->chatMessageEntityToArray($chatMessage);
        }

        return $this->json($chatMessagesArray);
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/chat-messages", name="post_chatbox", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function postToChatbox(Request $request): Response
    {
        $data = json_decode($request->getContent());

        /** @var User $user */
        $user = $this->getUser();


        $message = new ChatMessage();
        $message
            ->setUser($user)
            ->setMessage($data->message)
        ;

        $em = $this->getDoctrine()->getManager();
        $em->persist($message);
        $em->flush();

        return $this->json($this->chatMessageService->chatMessageEntityToArray($message));
    }
}
