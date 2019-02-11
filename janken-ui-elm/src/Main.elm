module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Dict exposing (Dict)
import Types exposing (..)
import Emojis
import Apis


init : () -> ( Model, Cmd Msg )
init _ =
    ( Model Init Gu Gu Draw, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Janken hand ->
            ( { model | phase = Started, player = hand }, Apis.postJanken hand )

        Reset ->
            ( { model | phase = Init }, Cmd.none )

        Finish nextModel ->
            ( nextModel, Cmd.none )

        Nop ->
            ( model, Cmd.none )


view : Model -> Html Msg
view { phase, player, enemy, issue } =
    let
        handText hand =
            Emojis.hands |> Dict.get (handToString hand) |> Maybe.withDefault "" |> text

        issueText =
            Emojis.issues |> Dict.get (issueToString issue) |> Maybe.withDefault "" |> text

        handButton hand =
            button [ disabled (phase /= Init), onClick (Janken hand) ] [ handText hand ]

        hidden cond =
            if cond then
                [ class "hidden" ]
            else
                []
    in
        div [ class "root" ]
            [ p [] [ text "じゃんけん……" ]
            , p []
                [ handButton Gu
                , handButton Choki
                , handButton Pa
                , button [ disabled (phase /= Finished), onClick Reset ] [ text "もう一回" ]
                ]
            , p
                (phase == Init |> hidden)
                [ text "ぽん！" ]
            , div
                (phase /= Finished |> hidden)
                [ p [ class "hand" ] [ text "あなたは", span [] [ handText player ] ]
                , p [ class "hand" ] [ text "相手は", span [] [ handText enemy ] ]
                , p [ class "issue" ] [ issueText ]
                ]
            ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


main =
    Browser.element { init = init, update = update, view = view, subscriptions = subscriptions }
