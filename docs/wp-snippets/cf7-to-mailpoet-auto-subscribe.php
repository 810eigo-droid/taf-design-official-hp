<?php
/**
 * CF7「お問い合わせV2」送信時に MailPoet リスト「資料請求者」へ自動登録
 *
 * 設置先: WPCode(コードスニペット)に PHPスニペットとして貼り付け
 * 作成: 2026-07-22
 *
 * 動作:
 * - Contact Form 7 のフォーム「お問い合わせV2」が送信成功したときだけ動く
 * - 送信データからメールアドレスと名前を拾い、MailPoetの「資料請求者」リストに追加
 * - 追加された瞬間に MailPoet の自動化(1日後/4日後/7日後の3通)が予約される
 * - 既に購読者として存在する場合はリスト追加のみ(エラーにしない)
 * - MailPoet停止中などの異常時も、フォーム送信自体は絶対に妨げない
 *
 * 前提:
 * - MailPoet > 設定 > サインアップ承認 = 無効(オフ)にすること
 *   (オンだと確認メールを踏むまで「未確認」のままになり、自動化が始まらない。
 *    フォーム側に「※資料請求と同時にメルマガにご登録されます」を明示済みのため
 *    ダブルオプトインは併用しない方針)
 */

add_action('wpcf7_mail_sent', function ($contact_form) {
    // 対象フォーム以外は無視(フォーム名で判定)
    if ($contact_form->title() !== 'お問い合わせV2') {
        return;
    }

    $submission = WPCF7_Submission::get_instance();
    if (!$submission) {
        return;
    }
    $data = $submission->get_posted_data();

    // 送信データからメールアドレスと名前を拾う(項目名が変わっても動くよう総当たり)
    $email = '';
    $name  = '';
    foreach ($data as $key => $value) {
        if (is_array($value)) {
            continue;
        }
        $value = trim((string) $value);
        if ($value === '') {
            continue;
        }
        if ($email === '' && is_email($value)) {
            $email = $value;
        }
        if ($name === '' && stripos($key, 'name') !== false && !is_email($value)) {
            $name = $value;
        }
    }
    if ($email === '') {
        return;
    }

    // MailPoet が無効化されていたら何もしない
    if (!class_exists('\MailPoet\API\API')) {
        return;
    }

    try {
        $api = \MailPoet\API\API::MP('v1');

        // リスト「資料請求者」のIDを名前で探す
        $list_id = null;
        foreach ($api->getLists() as $list) {
            if ($list['name'] === '資料請求者') {
                $list_id = $list['id'];
                break;
            }
        }
        if (!$list_id) {
            return; // リスト名が変わっていたら何もしない(要リスト名同期)
        }

        try {
            // 新規購読者として追加(リスト指定つき)
            $api->addSubscriber(
                array('email' => $email, 'first_name' => $name),
                array($list_id)
            );
        } catch (\Exception $e) {
            // 既に存在する場合など → リスト追加だけ試みる
            try {
                $subscriber = $api->getSubscriber($email);
                $api->subscribeToLists($subscriber['id'], array($list_id));
            } catch (\Exception $e2) {
                // ここでも失敗したら諦める(フォーム送信は妨げない)
            }
        }
    } catch (\Exception $e) {
        // MailPoet API初期化失敗など。フォーム送信は妨げない
    }
}, 10, 1);
