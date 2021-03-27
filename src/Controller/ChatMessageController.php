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
        return $this->json($this->chatMessageService->getLastMessagesByCount(10));
    }

    /**
     * @Route("/api/chat-messages-more", name="chat_message_more", methods={"GET"})
     */
    public function getMoreChatMessages(): Response
    {
        return $this->json($this->chatMessageService->getLastMessagesByCount(50));
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

        if (property_exists($data, 'returnMoreMessages') && $data->returnMoreMessages) {
            return $this->json($this->chatMessageService->getLastMessagesByCount(50));
        }

        return $this->json($this->chatMessageService->getLastMessagesByCount(10));
    }
}
